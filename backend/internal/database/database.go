package database

import (
	"fmt"
	"sort"
	"strconv"
	"sync"
)

type Database interface {
	SetRewardToClaimed(rewardID string) error
	GetStateOfRewardClaim(rewardID string) (bool, error)
	GetRewards() []DBReward
}

type database struct {
	rewards map[string]bool
	sync.RWMutex
}

func NewDatabase() Database {
	rewards := make(map[string]bool)
	for i := 0; i <= 10; i++ {
    	rewards[fmt.Sprint(i)] = false
	}
	return &database{rewards: rewards}
}

func (d *database) SetRewardToClaimed(rewardID string) error {
	d.Lock()
	defer d.Unlock()

	_, ok := d.rewards[rewardID]
	if !ok {
		return fmt.Errorf("rewardId not found in database")
	}

	d.rewards[rewardID] = true
	return nil
}

func (d *database) GetStateOfRewardClaim(rewardID string) (bool, error) {
	d.Lock()
	defer d.Unlock()

	paid, ok := d.rewards[rewardID]
	if !ok {
		return false, fmt.Errorf("rewardId not found in database")
	}

	return paid, nil
}

type DBReward struct {
	ID string;
	Claimed bool;
}

func (d *database) GetRewards() []DBReward {
	d.Lock()
	defer d.Unlock()

	rewards := make([]DBReward, len(d.rewards))
	i := 0
	for id, paid := range d.rewards {
		rewards[i] = DBReward{ID: id, Claimed: paid}
		i++
	}
	sort.SliceStable(rewards, func(i, j int) bool {
		//TODO
		a, _ := strconv.Atoi(rewards[i].ID)
		b, _ := strconv.Atoi(rewards[j].ID)
    return  a <  b
	})	

	return rewards
}