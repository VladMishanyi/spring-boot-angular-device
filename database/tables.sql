DROP DATABASE IF EXISTS ReometrBase;
CREATE DATABASE IF NOT EXISTS ReometrBase CHARSET = utf8 COLLATE = utf8_general_ci;
USE ReometrBase;

/*----------------------------------------------------------------------------------*/
DROP TABLE IF EXISTS mv110_1td;
CREATE TABLE mv110_1td (
                             id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                             date               TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             holdingRegister0   FLOAT           NOT NULL DEFAULT 0,
                             id_recipe          BIGINT UNSIGNED,
                             CONSTRAINT mv110_1td_pk PRIMARY KEY(id),
                             CONSTRAINT mv110_1td_fk FOREIGN KEY(id_recipe) REFERENCES recipe(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*----------------------------------------------------------------------------------*/
DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe(
    id   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    date TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255)    NOT NULL DEFAULT 'empty',
    time INT          NOT NULL DEFAULT 0,
    CONSTRAINT recipe_pk PRIMARY KEY(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

