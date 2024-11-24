CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  vehicle VARCHAR(255) NOT NULL,
  review_rating INTEGER NOT NULL,
  review_comment TEXT NOT NULL,
  fee DECIMAL(10, 2) NOT NULL,
  min_km INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ride (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  distance INTEGER NOT NULL,
  duration VARCHAR(255) NOT NULL,
  driver_id INTEGER NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL
);

INSERT INTO drivers ("name", "description", "vehicle", "review_rating", "review_comment", "fee", "min_km") VALUES
('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', 2, 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 2.5, 1),
('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', 4, 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 5, 5),
('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', 5, 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto', 10, 10);
