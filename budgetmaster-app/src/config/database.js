const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao SQLite com sucesso');
  }
});

db.serialize(() => {

  /* =========================
     ORÇAMENTOS
  ========================= */
  db.run(`
    CREATE TABLE IF NOT EXISTS orcamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      custo REAL NOT NULL,
      lucro REAL NOT NULL,
      margem REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pendente',
      deletado INTEGER DEFAULT 0,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  /* =========================
     ORDENS DE SERVIÇO
  ========================= */
  db.run(`
    CREATE TABLE IF NOT EXISTS ordens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orcamento_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'em_andamento',
      deletado INTEGER DEFAULT 0,
      data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_fim DATETIME,
      FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id)
    )
  `);

});

module.exports = db;