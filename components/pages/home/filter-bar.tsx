import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArchiveIcon,
  ArrowDown,
  ArrowUp,
  Box,
  CalendarPlusIcon,
  ClockIcon,
  FileCheck,
  FlaskConical,
  Flower,
  ListFilterIcon,
  MailCheckIcon,
  Megaphone,
  Microscope,
  Sparkle,
  Trash2Icon,
  Zap,
} from "lucide-react";

export const FilterBar = () => {
  return (
    <div className="flex w-full justify-between items-center py-4">
      <div className="flex gap-3 justify-center items-center">
        <Button variant="outline" size="lg" className="px-6 border-secondary border-b">
          <Zap />
          The Latest
        </Button>
        <p className="type-heading-4">•</p>
        <ButtonGroup>
          <Button variant="outline" size="lg" className="px-6">
            <FlaskConical />
            Ingredients & Formulation
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <Flower />
            Fragrance
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <Box />
            Packaging
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <Microscope />
            &D
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <FileCheck />
            Regulations
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <ArrowUp />
            Springboard
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <Megaphone />
            Marketing
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            <Sparkle />
            Ai & Technology
          </Button>
        </ButtonGroup>
      </div>

      <ButtonGroup>
        <Button variant="outline" size="lg" className="px-6">
          Latest
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-lg" aria-label="More Options">
              <ArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterIcon />
                Add to List
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
};
