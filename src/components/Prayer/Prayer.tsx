interface PrayerProps {
  name: string;
  time: string;
}

const Prayer = ({ name, time }: PrayerProps) => {
  return (
    <div className="prayer">
      <p className="name_prayer">{name}</p>
      <p className="time_prayer">{time}</p>
    </div>
  );
};

export default Prayer;
