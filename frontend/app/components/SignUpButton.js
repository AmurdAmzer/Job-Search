'use client';

import { useRouter } from 'next/navigation';

export default function SignUpButton({ label = 'Sign Up', className = '' }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/signup')}
      className={className}
    >
      {label}
    </button>
  );
}