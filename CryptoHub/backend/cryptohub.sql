\echo 'Delete and recreate cryptohub db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cryptohub;
CREATE DATABASE cryptohub;
\connect cryptohub

\i cryptohub-schema.sql

\echo 'Delete and recreate cryptohub_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cryptohub_test;
CREATE DATABASE cryptohub_test;
\connect cryptohub_test

\i cryptohub-schema.sql
