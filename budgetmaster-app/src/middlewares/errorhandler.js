module.exports = (err, req, res, next) => {
  // Log mais limpo e útil
  console.error('❌ Erro capturado:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
  });

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    sucesso: false,
    erro: err.message || 'Erro interno do servidor',
    status: statusCode
  });
};