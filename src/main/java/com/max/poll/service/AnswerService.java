package com.max.poll.service;

import com.max.poll.domain.Answer;
import com.max.poll.repository.AnswerRepository;
import com.max.poll.security.SecurityUtils;
import com.max.poll.service.dto.AnswerDTO;
import com.max.poll.service.dto.ChartDataDTO;
import com.max.poll.service.mapper.AnswerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Set;

/**
 * Service class for managing polls.
 */
@Service
@Transactional
public class AnswerService {
    private final Logger log = LoggerFactory.getLogger(AnswerService.class);

    private final AnswerRepository repository;

    private final AnswerMapper mapper;

    private final UserService userService;

    public AnswerService(AnswerRepository repository, AnswerMapper mapper, UserService userService) {
        this.repository = repository;
        this.mapper = mapper;
        this.userService = userService;
    }

    public AnswerDTO findById(Long id){
        return mapper.toDto(repository.findById(id).orElseThrow());
    }

    public AnswerDTO save(AnswerDTO answerDTO){
        if(answerDTO.getId()==null){
            answerDTO.setCreatedDate(Instant.now());
        }
        Answer answer = mapper.toEntity(answerDTO);
        answer.setUser(null);
        if(SecurityUtils.isAuthenticated()){
            userService.getUserWithAuthorities().ifPresent(answer::setUser);
        }
        return mapper.toDto(repository.save(answer));
    }

    public Set<ChartDataDTO> getChartData(Long id){
        return repository.getChartDataByPollId(id);
    }
}
