package com.max.poll.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;

/**
 * A user.
 */
@Entity
@Table(name = "poll")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Poll implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_poll")
    @SequenceGenerator(name = "sequence_poll", sequenceName = "sequence_poll", allocationSize = 1)
    private Long id;

    @NotNull
    @Size(min = 1, max = 250)
    @Column(length = 250,  nullable = false)
    private String title;

    @Size(min = 1, max = 500)
    @Column(length = 500)
    private String description;

    @JoinColumn(name = "jhi_user_id")
    @ManyToOne
    private User user;

    @Column(name = "created_date")
    private Instant createdDate = null;

    @ElementCollection
    @CollectionTable(name = "poll_option", joinColumns = @JoinColumn(name = "poll_id", referencedColumnName = "id"))
    @Column(name = "option")
    private List<String> options;

    @Column(name = "need_login")
    private Boolean needLogin;

    @Column(name = "shared_link")
    private String hash;

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Poll)) {
            return false;
        }
        return id != null && id.equals(((Poll) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}
