package com.vk.springbootangulardevice.model;

import org.springframework.stereotype.Component;

@Component
public class JsonString {
    private String content;

    public JsonString() {
    }

    public JsonString(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
