'use client';

import cn from 'classnames';
import styles from './ContactForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CTA from '../CTA';
import { toast } from 'react-hot-toast';

export type ContactFormProps = {};

type TFormInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(20),
  email: z.string().email({ message: 'Invalid email address' }).max(38),
  phone: z.string().optional(),
  message: z.string().min(2, { message: 'Reason for contact is required' }).max(1000),
});

const ContactForm = (_props: ContactFormProps): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormInput>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<TFormInput> = async (formData) => {
    const { name = 'friend' } = formData;

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }

      const responseData = await response.json();
      toast.success(`Hey ${name}, your message sent successfully!`);
      reset();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className={styles.contact}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles['input-group']}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input id="name" placeholder="Name" className={cn(styles.input)} {...register('name')} />
          {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            className={cn(styles.input)}
            {...register('email')}
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            id="phone"
            placeholder="Phone"
            className={cn(styles.input)}
            {...register('phone')}
          />
          {errors.phone && <div className={styles.error}>{errors.phone.message}</div>}
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            placeholder="Tell me a bit about what you're looking for!"
            rows={5}
            className={cn(styles.input, styles['text-area'])}
            {...register('message')}
          />
          {errors.message && <div className={styles.error}>{errors.message.message}</div>}
        </div>

        <div className={styles['input-group']}>
          <CTA label="Send" type="submit" as="button" className={styles.button} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
