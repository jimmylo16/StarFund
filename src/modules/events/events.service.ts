import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventInput } from './dto/create-events.input';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEventInput } from './dto/update-events.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(createEventInput);
    return await this.eventRepository.save(event);
  }
  async findAll() {
    const events = await this.eventRepository.find();

    return events;
  }
  async findOne(event_id: string) {
    const Event = await this.eventRepository.findOneBy({ event_id });

    return Event;
  }
  async update(event_id: string, updateEventInput: UpdateEventInput) {
    const Event = await this.eventRepository.preload({
      event_id: event_id,
      ...updateEventInput,
    });
    if (!Event) {
      throw new NotFoundException(`Event #${event_id} not found`);
    }
    return this.eventRepository.save(Event);
  }

  async remove(event_id: string) {
    const Event = await this.findOne(event_id);
    if (!Event) {
      throw new NotFoundException(`Event #${event_id} not found`);
    }
    await this.eventRepository.remove(Event);
    return {
      event_id: event_id,
    };
  }
}
