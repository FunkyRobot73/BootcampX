const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const value = process.argv.slice(2);

pool.query(`
SELECT DISTINCT
  teachers.name as teacher,
  cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`, value)
.then(res => {
  res.rows.forEach(user => {
    // console.log(res.rows);
    console.log(`${user.cohort}: ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));