package main

import (
	"fmt"
	"strconv"
	s "strings"
	"syscall/js"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type point struct {
	value      int8
	hasFlashed bool
}

const (
	SIZE_X = 10
	SIZE_Y = 10
)

var c chan bool

func main() {
	c = make(chan bool)

	js.Global().Set("eleven_first", js.FuncOf(first))
	js.Global().Set("eleven_second", js.FuncOf(second))
	js.Global().Set("eleven_kill", js.FuncOf(kill))

	<-c
}

func kill(this js.Value, inputs []js.Value) interface{} {
	c <- true
	return nil
}

func first(this js.Value, inputs []js.Value) interface{} {
	callback := inputs[len(inputs)-1:][0]
	message := inputs[0].String()
	lines := s.Split(message, "\n")

	var coordinates [SIZE_Y][SIZE_X]point
	for y, line := range lines {
		for x, char := range s.Split(line, "") {
			value, err := strconv.ParseInt(char, 10, 8)
			check(err)

			coordinates[y][x] = point{value: int8(value), hasFlashed: false}
		}
	}

	flashes := 0

	for i := 0; i < 100; i++ {
		newCoordinates, newFlashes := step(coordinates)
		coordinates = newCoordinates
		flashes += newFlashes
	}

	callback.Invoke(js.ValueOf(flashes))

	return nil
}

func second(this js.Value, inputs []js.Value) interface{} {
	callback := inputs[len(inputs)-1:][0]
	message := inputs[0].String()
	lines := s.Split(message, "\n")

	var coordinates [SIZE_Y][SIZE_X]point
	for y, line := range lines {
		for x, char := range s.Split(line, "") {
			value, err := strconv.ParseInt(char, 10, 8)
			check(err)

			coordinates[y][x] = point{value: int8(value), hasFlashed: false}
		}
	}

	flashes := 0

	for i := 0; i <= 999; i++ {
		newCoordinates, newFlashes := step(coordinates)
		coordinates = newCoordinates
		flashes += newFlashes

		// Second part
		if newFlashes == SIZE_Y*SIZE_X {
			callback.Invoke(js.ValueOf(i + 1))
		}
	}

	callback.Invoke(js.Null())

	return nil
}

func print(coordinates [SIZE_Y][SIZE_X]point) {
	for y := 0; y < SIZE_Y; y++ {
		for x := 0; x < SIZE_X; x++ {
			if coordinates[y][x].value == 0 {
				fmt.Printf("\033[1;36m%d\033[0m", coordinates[y][x].value)
			} else {
				fmt.Printf("%d", coordinates[y][x].value)
			}
		}
		fmt.Println()
	}
}

func step(coordinates [SIZE_Y][SIZE_X]point) ([SIZE_Y][SIZE_X]point, int) {
	for y := 0; y < SIZE_Y; y++ {
		for x := 0; x < SIZE_X; x++ {
			coordinates[y][x].value += 1
		}
	}

	var oldCoordinates [SIZE_Y][SIZE_X]point
	for oldCoordinates != coordinates {
		oldCoordinates = coordinates

		for iy := 0; iy < SIZE_Y; iy++ {
			for ix := 0; ix < SIZE_X; ix++ {
				coordinate := &coordinates[iy][ix]
				if coordinate.value > 9 {
					//fmt.Println("Exploding", iy, ix, coordinate.value)
					coordinate.value = 0
					coordinate.hasFlashed = true
					fromX := ix - 1
					if fromX < 0 {
						fromX = 0
					}

					toX := ix + 1
					if toX > 9 {
						toX = 9
					}

					fromY := iy - 1
					if fromY < 0 {
						fromY = 0
					}

					toY := iy + 1
					if toY > 9 {
						toY = 9
					}

					for x := fromX; x <= toX; x++ {
						for y := fromY; y <= toY; y++ {
							if x == ix && y == iy {
								continue
							}

							coordToChange := &coordinates[y][x]
							if coordToChange.hasFlashed {
								continue
							}

							coordToChange.value += 1
						}
					}
				}
			}
		}
	}

	flashes := 0
	for y := 0; y < SIZE_Y; y++ {
		for x := 0; x < SIZE_X; x++ {
			if coordinates[y][x].hasFlashed {
				flashes++
				coordinates[y][x].hasFlashed = false
				coordinates[y][x].value = 0
			}
		}
	}

	return coordinates, flashes
}
