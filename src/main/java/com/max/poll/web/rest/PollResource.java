package com.max.poll.web.rest;

import com.max.poll.service.PollService;
import com.max.poll.service.dto.PollDTO;
import com.max.poll.service.dto.PollFilterDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.HeaderUtil;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/api/poll")
public class PollResource {

    private final PollService pollService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public PollResource(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping("/{id}")
    public PollDTO findById(@PathVariable("id") long id){
        return pollService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PollDTO> save(@RequestBody PollDTO pollDTO){
        return ResponseEntity.ok(pollService.save(pollDTO));
    }

    @PostMapping("/filter")
    public ResponseEntity<Page<PollDTO>> findAll(@RequestBody PollFilterDTO pollFilterDTO, Pageable pageable){
        Page<PollDTO> page = pollService.findAllByFilter(pollFilterDTO,pageable);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/dashboard")
    public List<PollDTO> findTopTen(){
        return pollService.findTopTen();
    }

    @DeleteMapping("/{id}")
    public void deletePoll(@PathVariable Long id){
        pollService.delete(id);
        ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "poll deleted", String.valueOf(id))).build();
    }

    @GetMapping("/hash/{hash}")
    public PollDTO findByHash(@PathVariable("hash") String hash){
        return pollService.finByHash(hash);
    }

    @PutMapping("/associate/{id}")
    public PollDTO associate(@PathVariable("id") Long id){
        return pollService.assosiate(id);
    }

}
