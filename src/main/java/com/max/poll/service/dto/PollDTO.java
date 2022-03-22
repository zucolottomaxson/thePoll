package com.max.poll.service.dto;

import java.time.Instant;
import java.util.List;

public class PollDTO {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private Instant createdDate = null;
    private List<String> options;
    private Boolean needLogin;
    private String hash;

    public PollDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public Boolean getNeedLogin() {
        return needLogin;
    }

    public void setNeedLogin(Boolean needLogin) {
        this.needLogin = needLogin;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}
