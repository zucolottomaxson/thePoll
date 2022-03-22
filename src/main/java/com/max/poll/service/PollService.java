package com.max.poll.service;

import com.max.poll.domain.Poll;
import com.max.poll.domain.User;
import com.max.poll.repository.PollRepository;
import com.max.poll.security.SecurityUtils;
import com.max.poll.service.dto.PollDTO;
import com.max.poll.service.dto.PollFilterDTO;
import com.max.poll.service.mapper.PollMapper;
import com.max.poll.util.HashUtils;
import com.max.poll.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing polls.
 */
@Service
@Transactional
public class PollService {
    private final Logger log = LoggerFactory.getLogger(PollService.class);

    private final PollRepository repository;

    private final PollMapper mapper;

    private final UserService userService;

    public PollService(PollRepository repository, PollMapper mapper, UserService userService) {
        this.repository = repository;
        this.mapper = mapper;
        this.userService = userService;
    }

    public PollDTO findById(Long id){
        return mapper.toDto(repository.findById(id).orElseThrow());
    }

    public PollDTO save(PollDTO pollDTO){
        if(pollDTO.getId()==null){
            createHashForLink(pollDTO);
        }
        Poll poll = mapper.toEntity(pollDTO);
        poll.setUser(null);
        if(SecurityUtils.isAuthenticated()){
            userService.getUserWithAuthorities().ifPresent(poll::setUser);
        }
        return mapper.toDto(repository.save(poll));
    }

    private void createHashForLink(PollDTO pollDTO){
        Instant instant = Instant.now();
        pollDTO.setCreatedDate(instant);
        pollDTO.setHash(HashUtils.getHashMd5(instant.toString()));
    }

    public List<PollDTO> findTopTen(){
        return mapper.toDto(repository.findTop10ByOrderByCreatedDateAsc());
    }

    public Page<PollDTO> findAllByUser(Pageable pageable){
        Long userID = null;
        Optional<User> optionalUser = userService.getUserWithAuthorities();
        if(optionalUser.isPresent()){
            userID = optionalUser.get().getId();
        }
        return repository.findAllByUserId(userID,pageable).map(mapper::toDto);
    }

    public Page<PollDTO> findAllByFilter(PollFilterDTO pollFilterDTO, Pageable pageable){
        Optional<User> optionalUser = userService.getUserWithAuthorities();
        if(optionalUser.isPresent() && pollFilterDTO.getOnlyMy()){
            pollFilterDTO.setUserId(optionalUser.get().getId());
        }
        return repository.findAllByFilter(pollFilterDTO, pageable).map(mapper::toDto);
    }

    public void delete(Long id){
        Optional<Poll> poll = repository.findById(id);
        poll.ifPresent(repository::delete);
    }

    public PollDTO finByHash(String hash){
        return mapper.toDto(repository.findByHash(hash));
    }

    public PollDTO assosiate(Long id) {
        Optional<Poll> opPoll = repository.findById(id);
        Poll poll;
        User user;
        if(!opPoll.isPresent()){
           return null;
        }
        Optional<User> optionalUser = userService.getUserWithAuthorities();
        if(!optionalUser.isPresent()){
            throw new BadRequestAlertException("You are not logged in","Poll", "has.user.associated");
        }
        user = optionalUser.get();
        poll= opPoll.get();
        if(poll.getUser()!=null && !poll.getUser().getLogin().equals(user.getLogin())){
            throw new BadRequestAlertException("Poll already has associated user","Poll", "has.user.associated");
        }
        poll.setUser(user);
        return mapper.toDto(repository.save(poll));
    }
}
