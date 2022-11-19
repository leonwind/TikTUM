#!/bin/bash

# This script will take a video file and an audio file and combine them into a single video file.

AUDIO_FILE=$1 # The audio file to use in wav format
VIDEO_FILE=$2 # The video file to use in mp4 format
OUTPUT_FILE=$3 # The output file to create in mp4 format

ffmpeg -i $(VIDEO_FILE) -i $(AUDIO_FILE) -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 $(OUTPUT_FILE)
