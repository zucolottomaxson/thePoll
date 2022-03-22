package com.max.poll.web.rest;

import com.max.poll.service.AnswerService;
import com.max.poll.service.dto.AnswerDTO;
import com.max.poll.service.dto.ChartDataDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/answer")
public class AnswerResource {

    private final AnswerService answerService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public AnswerResource(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/{id}")
    public AnswerDTO findById(@PathVariable("id") long id){
        return answerService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerDTO> save(@RequestBody AnswerDTO answerDTO){
        return ResponseEntity.ok(answerService.save(answerDTO));
    }

    @GetMapping("/chart/{id}")
    public Set<ChartDataDTO> getChartData(@PathVariable("id") Long id){
        return answerService.getChartData(id);
    }

}
