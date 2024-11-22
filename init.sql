CREATE TABLE IF NOT EXISTS driver (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  car VARCHAR(255) NOT NULL,
  rating TEXT NOT NULL,
  fee NUMERIC(10, 2) NOT NULL,
  "minKm" NUMERIC(10, 2) NOT NULL
);

INSERT INTO "driver" ("name", "description", "car", "rating", "fee", "minKm") VALUES
('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', '2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 2.5, 1),
('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', '4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 5, 5),
('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', '5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto', 10, 10);
