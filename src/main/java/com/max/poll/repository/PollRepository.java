package com.max.poll.repository;

import com.max.poll.domain.Poll;
import com.max.poll.service.dto.PollFilterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the {@link Poll} entity.
 */
@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findTop10ByOrderByCreatedDateAsc();

    Page<Poll> findAllByUserId(Long userId, Pageable page);

    Page<Poll> findAllByTitleContaining(String title, Pageable page);

    @Query("select p from Poll p where 1=1 " +
        " AND ((:#{#filter.title} is NULL) or (LOWER(COALESCE(p.title,'')) like lower(concat(concat('%',cast(COALESCE(:#{#filter.title},'') as text)),'%')) ) ) " +
        " AND ((:#{#filter.description} is NULL) or (LOWER(COALESCE(p.description, '')) like lower(concat(concat('%',cast(COALESCE(:#{#filter.description},'') as text)),'%'))) )" +
        " AND (:#{#filter.userId} is NULL or p.user.id = :#{#filter.userId}) " +
        " AND (:#{#filter.needLogin} is NULL or p.needLogin = :#{#filter.needLogin}) ")
    Page<Poll> findAllByFilter(@Param("filter")PollFilterDTO pollFilterDTO, Pageable pageable);

    Poll findByHash(String hash);
}
