import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-events.input';
import { UpdateEventInput } from './dto/update-events.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }
  @Query(() => Event, { name: 'event' })
  findOne(@Args('event_id', { type: () => String }) event_id: string) {
    return this.eventsService.findOne(event_id);
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(
      updateEventInput.event_id,
      updateEventInput,
    );
  }

  @Mutation(() => Event)
  removeFighter(@Args('event_id', { type: () => String }) event_id: string) {
    return this.eventsService.remove(event_id);
  }
}
