import React, { FC, useState, useEffect, useCallback, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import { Title, Form, Repositories, Error } from "./styles";

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
  const [inputError, setInputError] = useState("");

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      "@GihubExplore:repositories"
    );

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "@GihubExplore:repositories",
      JSON.stringify(repositories)
    );
  }, [repositories]);

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!newRepo) {
        setInputError("Informe um repositório válido");
        return;
      }

      try {
        const response = await api.get(`repos/${newRepo}`);

        const repository: Repository = response.data;

        setRepositories([...repositories, repository]);

        setNewRepo("");
        setInputError("");
      } catch (error) {
        setInputError("Erro durante a busca por esse repostitório!");
      }
    },
    [newRepo, repositories]
  );

  return (
    <>
      <img src={logo} alt="Github" />
      <Title>Explore repositorios no github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

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
