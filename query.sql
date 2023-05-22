SELECT department.department_name AS department, roles.title
FROM roles
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY departments.department_name;

SELECT employees.first_name, department.department_name AS department, roles.title
FROM employees
LEFT JOIN roles
ON roles.id = employees.roles.id
LEFT JOIN department
ON roles.department_id = department.id;
