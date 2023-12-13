import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { doRequest } from '../helpers/api';

const Home = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const { logout }: any = useAuth();
  // const navigate = use'Navigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await doRequest('GET', '/user', true);
      const userData = await response.json();

      setId(userData.id);
      setName(userData.name);
    };

    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Layout title="Home">
      <div className="d-grid gap-2">
        <p>ID do usuário: {id}</p>
        <p>Nome: {name}</p>
        <button className="btn btn-dark btn-block p-2" onClick={logout}>
          Sair
        </button>
      </div>
    </Layout>
  );
};

export default Home;
