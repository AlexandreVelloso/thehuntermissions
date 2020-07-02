-- Users
SELECT * FROM users;

-- User Objectives
SELECT u.email, o.name AS objective_name, completed, count(o.name) AS count_duplicated
FROM users u
JOIN user_objectives uo ON u.id = uo.user_id
JOIN objectives o ON o.id = uo.objective_id
GROUP BY email, name, completed;

-- User Weapons
SELECT u.id, u.email, weapon_id, w.name AS weapon_name, have_weapon
FROM users u
JOIN user_weapons uw ON u.id = uw.user_id
JOIN weapons w ON w.id = uw.weapon_id;

-- User Equipaments
SELECT u.id, u.email, equipament_id e.name AS equipament_name, have_equipament
from users u
JOIN user_equipaments ue ON u.id = ue.user_id
JOIN equipaments e ON e.id = ue.equipament_id
