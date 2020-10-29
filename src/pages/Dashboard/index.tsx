import React, { FC, useState, useCallback, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await api.get(`repos/${newRepo}`);

      const repository: Repository = response.data;

      setRepositories([...repositories, repository]);

      setNewRepo("");
    },
    [newRepo]
  );

  return (
    <>
      <img src={logo} alt="Github" />
      <Title>Explore repositorios no github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="test">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
