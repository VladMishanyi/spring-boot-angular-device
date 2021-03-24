DROP DATABASE IF EXISTS ReometrBase;
CREATE DATABASE IF NOT EXISTS ReometrBase CHARSET = utf8 COLLATE = utf8_general_ci;
USE ReometrBase;

/*----------------------------------------------------------------------------------*/
DROP TABLE IF EXISTS mv110_1td;
CREATE TABLE mv110_1td (
                             id                 int UNSIGNED NOT NULL AUTO_INCREMENT,
                             date               TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             holdingRegister0   FLOAT        NOT NULL DEFAULT 0
                             PRIMARY KEY (id)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8;

