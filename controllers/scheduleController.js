const dayjs = require("dayjs");
const Schedule = require("../models/Schedule");
const Doctor = require("../models/Doctor");

const dayMap = {
  minggu: 0,
  senin: 1,
  selasa: 2,
  rabu: 3,
  kamis: 4,
  jumat: 5,
  sabtu: 6,
};

exports.createSchedulesLoop = async (req, res) => {
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

  try {
    const bulkData = dates.map((tanggal) => ({
      doctor_id,
      day,
      tanggal,
      start_time: time_start,
      end_time: time_finish,
      quota,
      status,
    }));

    const result = await Schedule.bulkCreate(bulkData);
    res.json({ success: true, inserted: result.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan jadwal" });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [{ model: Doctor, attributes: ["name"] }],
      order: [["tanggal", "ASC"]],
    });

    const result = schedules.map((s) => ({
      id: s.id,
      dokter: s.Doctor.name,
      day: s.day,
      tanggal: s.tanggal,
      start_time: s.start_time,
      end_time: s.end_time,
      quota: s.quota,
      status: s.status,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil jadwal" });
  }
};
