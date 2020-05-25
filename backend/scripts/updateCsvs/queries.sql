-- User Weapons
SELECT u.email, o.name, completed, count(o.name) AS count_duplicated
FROM users u
JOIN user_objectives uo ON u.id = uo.user_id
JOIN objectives o ON o.id = uo.objective_id
GROUP BY email, name, completed;

-- User objectives
SELECT u.id, u.email, weapon_id, w.name AS weapon_name, have_weapon
FROM users u
JOIN user_weapons uw ON u.id = uw.user_id
JOIN weapons w ON w.id = uw.weapon_id;