"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ChevronRight, Clock } from "lucide-react";
import { useState } from "react";

const SlotPicker = ({ days, onSelectedSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const firstDayWithSlots =
    days.find((day) => day.slots?.length > 0)?.date || days[0]?.date;

  const [activeTab, setActiveTab] = useState(firstDayWithSlots);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectedSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
    <Tabs
  defaultValue={activeTab}
  onValueChange={setActiveTab}
  className="w-full"
>
  <TabsList className="w-full bg-[#212327] h-24 border-blue-900/40 shadow-md shadow-black/40 p-1 overflow-x-auto">
    <div className="flex gap-2 min-w-max pb-1">
      {days.map((day) => (
        <TabsTrigger
          key={day.date}
          value={day.date}
          disabled={day.slots?.length === 0}
          className={`
            flex-shrink-0 px-3 py-2 rounded-md text-sm
            ${day.slots?.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div className="text-center">
            <div className="font-medium">
              {format(new Date(day.date), "MMM d")}
            </div>
            <div className="text-xs opacity-70">
              {format(new Date(day.date), "EEE")}
            </div>
            {day.slots?.length > 0 && (
              <div className="mt-1 bg-blue-900/30 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                {day.slots?.length}
              </div>
            )}
          </div>
        </TabsTrigger>
      ))}
    </div>
  </TabsList>

  {days.map((day) => (
    <TabsContent key={day.date} value={day.date} className="pt-4">
      {day.slot?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No slots available for this day.
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            {day.displayDate}
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-5 md:grid-cols-5">
            {day.slots?.map((slot) => (
              <Card 
                key={slot.startTime}
                className={`
                  border-blue-900/50 shadow-md shadow-black/30 cursor-pointer 
                  bg-[#212327] transition-colors
                  ${selectedSlot?.startTime === slot.startTime 
                    ? "bg-blue-900/30 border-blue-600" 
                    : "hover:border-blue-700/40"
                  }
                `}
                onClick={() => handleSlotSelect(slot)}
              >
                <CardContent className="p-3 flex items-center">
                  <Clock
                  className={`h-4 w-4 mr-2 ${selectedSlot?.startTime === slot.startTime?"text-blue-400":"text-muted-foreground"}`}
                  />
                  <span className={selectedSlot?.startTime === slot.startTime? "text-white": "text-muted-foreground"}>
                    {format(new Date(slot.startTime),"h:mm a")}
                  </span>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </div>
      )}
    </TabsContent>
  ))}
</Tabs>
  <div className="flex justify-end">
    <Button
    className={"bg-blue-600 text-white hover:bg-blue-700"}
    disabled={!selectedSlot} 
    onClick={confirmSelection}
    >Continue <ChevronRight className="ml-2 h-4 w-4"/></Button>
  </div>
    </div>
  );
};

export default SlotPicker;
