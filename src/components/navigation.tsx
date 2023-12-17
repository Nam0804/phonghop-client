import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();

  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <nav>
      <button onClick={() => navigateTo('/')}>Home</button>
      {' | '}
      <button onClick={() => navigateTo('/about')}>About</button>
      {' | '}
      <button onClick={() => navigateTo('/contact')}>Contact</button>
    </nav>
  );
};

export default Navigation;