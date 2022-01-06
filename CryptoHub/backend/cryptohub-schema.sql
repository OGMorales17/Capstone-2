CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE portfolio (
--   id SERIAL PRIMARY KEY,
--   coin TEXT NOT NULL,
--   bough_price INTEGER NOT NULL,
--   bough_amount INTEGER NOT NULL,
--   air_drop BOOLEAN NOT NULL DEFAULT FALSE
--     REFERENCES username ON DELETE CASCADE
-- );
