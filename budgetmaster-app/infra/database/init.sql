CREATE TABLE IF NOT EXISTS orcamentos (
  id SERIAL PRIMARY KEY,
  cliente TEXT NOT NULL,
  descricao TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  custo NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pendente',
  deletado BOOLEAN DEFAULT false
);