package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonLong {
    private long content;

    public JsonLong() {
    }

    public JsonLong(long content) {
        this.content = content;
    }

    public long getContent() {
        return content;
    }

    public void setContent(long content) {
        this.content = content;
    }
}
