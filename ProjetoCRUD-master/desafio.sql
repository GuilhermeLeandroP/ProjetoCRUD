-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Mar-2023 às 15:01
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `desafio`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE `pedido` (
  `codigo` int(11) NOT NULL,
  `data` datetime DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `pedido`
--

INSERT INTO `pedido` (`codigo`, `data`, `total`) VALUES
(1, '2023-02-23 15:10:20', 155),
(26, '2023-03-22 10:57:54', 235),
(27, '2023-03-22 10:58:08', 500),
(28, '2023-03-22 10:58:14', 40000),
(29, '2023-03-22 11:00:17', 235);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `codigo` int(10) UNSIGNED NOT NULL,
  `nome` varchar(255) NOT NULL DEFAULT '',
  `valor` float NOT NULL DEFAULT 0,
  `tipo` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`codigo`, `nome`, `valor`, `tipo`) VALUES
(56, 'Camiseta', 100, 15),
(57, 'Calça', 120, 15),
(58, 'Tênis', 300, 15),
(59, 'Picanha', 90, 13),
(60, 'Pão', 1.5, 13),
(61, 'Maionese', 20, 13),
(62, 'Mouse', 200, 16),
(63, 'Teclado', 300, 16),
(64, 'Fusca', 40000, 14);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_pedido`
--

CREATE TABLE `produto_pedido` (
  `codigo` smallint(5) UNSIGNED NOT NULL,
  `pedido` int(11) DEFAULT NULL,
  `produto` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `imposto` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `produto_pedido`
--

INSERT INTO `produto_pedido` (`codigo`, `pedido`, `produto`, `quantidade`, `total`, `imposto`) VALUES
(88, 15, 1, 2, 20, 2),
(109, 2, 1, 2, 10, 2),
(110, 2, 56, 1, 100, 20),
(111, 2, 57, 1, 120, 24),
(112, 2, 58, 1, 300, 60),
(113, 26, 59, 2, 180, 54),
(114, 26, 60, 10, 15, 4.5),
(115, 26, 61, 2, 40, 12),
(116, 27, 62, 1, 200, 30),
(117, 27, 63, 1, 300, 45),
(118, 28, 64, 1, 40000, 14000),
(119, 29, 59, 2, 180, 54),
(120, 29, 60, 10, 15, 4.5),
(121, 29, 61, 2, 40, 12);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_produto`
--

CREATE TABLE `tipo_produto` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `percentual_imposto` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `tipo_produto`
--

INSERT INTO `tipo_produto` (`codigo`, `nome`, `percentual_imposto`) VALUES
(13, 'Alimento', 30),
(14, 'Automóvel', 35),
(15, 'Vestimento', 20),
(16, 'Periféricos', 15);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fktipo` (`tipo`);

--
-- Índices para tabela `produto_pedido`
--
ALTER TABLE `produto_pedido`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fkpedido` (`pedido`),
  ADD KEY `fkproduto` (`produto`);

--
-- Índices para tabela `tipo_produto`
--
ALTER TABLE `tipo_produto`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `codigo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de tabela `produto_pedido`
--
ALTER TABLE `produto_pedido`
  MODIFY `codigo` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de tabela `tipo_produto`
--
ALTER TABLE `tipo_produto`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
