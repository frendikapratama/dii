const dayjs = require("dayjs");
const db = require("../config/db");

const dayMap = {
  minggu: 0,
  senin: 1,
  selasa: 2,
  rabu: 3,
  kamis: 4,
  jumat: 5,
  sabtu: 6,
};

exports.createSchedulesLoop = (req, res) => {
  const { doctor_id, day, time_start, time_finish, quota, status, date_range } =
    req.body;

  if (!dayMap.hasOwnProperty(day.toLowerCase())) {
    return res.status(400).json({ error: "Hari tidak valid" });
  }

  const [startDateStr, endDateStr] = date_range.split(" s/d ");
  const start = dayjs(startDateStr);
  const end = dayjs(endDateStr);
  const targetDay = dayMap[day.toLowerCase()];

  const dates = [];
  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
    if (d.day() === targetDay) {
      dates.push(d.format("YYYY-MM-DD"));
    }
  }

  const values = dates.map((tanggal) => [
    doctor_id,
    day,
    tanggal,
    time_start,
    time_finish,
    quota,
    status,
  ]);

  const sql = `INSERT INTO schedules
    (doctor_id, day, tanggal, start_time, end_time, quota, status)
    VALUES ?`;

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal menyimpan jadwal" });
    res.json({ success: true, inserted: result.affectedRows });
  });
};

exports.getAllSchedules = (req, res) => {
  const sql = `SELECT s.id, d.name AS dokter, s.day, s.tanggal, s.start_time, s.end_time, s.quota, s.status
               FROM schedules s
               JOIN doctors d ON s.doctor_id = d.id
               ORDER BY s.tanggal ASC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil jadwal" });
    res.json(results);
  });
};
