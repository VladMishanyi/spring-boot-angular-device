package com.vk.springbootangulardevice.model;

import java.time.LocalDateTime;

public class JsonBodyLocalDateTimeFromChart {
    private LocalDateTime start;
    private LocalDateTime end;

    public JsonBodyLocalDateTimeFromChart(){}

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }
}
