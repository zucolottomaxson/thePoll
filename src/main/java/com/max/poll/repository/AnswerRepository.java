package com.max.poll.repository;

import com.max.poll.domain.Answer;
import com.max.poll.service.dto.ChartDataDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * Spring Data JPA repository for the {@link Answer} entity.
 */
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("select new com.max.poll.service.dto.ChartDataDTO(a.selectedOption, count(a.poll.id)) from Answer a where a.poll.id = :id group by a.selectedOption")
    Set<ChartDataDTO> getChartDataByPollId(@Param("id")Long id);
}
