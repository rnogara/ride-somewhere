import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/layout/Header";
import HomePage from "./components/layout/HomePage";

export default function Home() {
  return (
    <main className="w-full min-h-svh h-fit">
      <Header />
      <HomePage />
    </main>
  );
}
