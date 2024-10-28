import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"; // Material-UI를 사용

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface SchedulePlannerProps {
  onClose: () => void;
  onScheduleSelect: (event: Event) => void;
}

const SchedulePlanner = ({
  onClose,
  onScheduleSelect,
}: SchedulePlannerProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({
      title: "",
      start: slotInfo.start as Date,
      end: slotInfo.end as Date,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    const savedEvent = { ...newEvent };
    setEvents([...events, savedEvent]);
    setIsOpen(false);
    onScheduleSelect(savedEvent);
  };

  return (
    <div className="h-full p-4">
      <h1 className="text-2xl font-bold mb-4">일정 계획</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100% - 80px)" }}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>새 일정 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="일정 제목"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={onClose} variant="contained" className="mt-4">
        닫기
      </Button>
    </div>
  );
};

export default SchedulePlanner;
