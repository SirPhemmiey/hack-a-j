
-- Create phonebook table
CREATE TABLE `phonebook` (
  `id`            INT  NOT NULL  AUTO_INCREMENT,
  `firstname`     VARCHAR(100) NOT NULL,
  `lastname`      VARCHAR(100) NOT NULL,
  `email`         VARCHAR(100) NOT NULL,
  `phone`         VARCHAR(50) NOT NULL,
  `mobile`        VARCHAR(50) NULL,
  `company`       VARCHAR(100) NULL,
  `title`         VARCHAR(20) NULL,
  `created_date`  DATETIME NOT NULL,
  `updated_date`  DATETIME NOT NULL,
  PRIMARY KEY     (`id`)
) ENGINE=MyISAM;

-- Create users table
CREATE TABLE `users` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `username`    VARCHAR(100) NOT NULL,
  `password`    VARCHAR(100) NOT NULL,
   PRIMARY KEY  (`id`)
) ENGINE=MyISAM;


-- Populate users table
INSERT INTO `users` (`username`, `password`) VALUES ('test', '$2b$10$VCNblUVaYzj4YnKKoDag5ubtaqHna3M/7QpFcdNRW9IZk5/8L7ree');