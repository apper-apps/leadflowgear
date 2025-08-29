import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { format, addDays, startOfToday } from "date-fns";

const DatePicker = ({ 
  value, 
  onChange, 
  className,
  placeholder = "Select date",
  minDate = startOfToday(),
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const quickDates = [
    { label: "Today", value: startOfToday() },
    { label: "Tomorrow", value: addDays(startOfToday(), 1) },
    { label: "In 3 days", value: addDays(startOfToday(), 3) },
    { label: "Next week", value: addDays(startOfToday(), 7) },
    { label: "In 2 weeks", value: addDays(startOfToday(), 14) },
    { label: "Next month", value: addDays(startOfToday(), 30) }
  ];

  const handleDateSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime()) && dateValue >= minDate) {
      onChange(dateValue);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="datetime-local"
        value={value ? format(value, "yyyy-MM-dd'T'HH:mm") : ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        min={format(minDate, "yyyy-MM-dd'T'HH:mm")}
        onFocus={() => setIsOpen(true)}
        {...props}
      />
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-xl z-50 p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick select:</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickDates.map((date) => (
                <Button
                  key={date.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDateSelect(date.value)}
                  className="justify-start"
                >
                  {date.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;