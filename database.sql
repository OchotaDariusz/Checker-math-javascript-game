ALTER TABLE IF EXISTS ONLY public.users
    DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users
(
    id                  serial NOT NULL,
    username            text,
    password            text,
    level               integer,
    points              integer,
    registration_time   timestamp without time zone
);

INSERT INTO users (username, password, level, points, registration_time)
VALUES ('FreeStyleGame', '$2b$12$X23o0b5QEBe2nufX.swaduA/mdu0puzjjkcVnoIuoBrkFCEH7j8zy', 0, 0 , '2022-05-30 14:05:00');