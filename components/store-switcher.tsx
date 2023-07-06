"use client";

import { Store } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface PopoverSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher: React.FC<PopoverSwitcherProps> = ({
  items = [],
  className,
}) => {
  const storeModal = useStoreModal();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Select a store"
          role="combobox"
          aria-expanded={open}
          className={cn("sm:w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <span className="flex-1 text-start line-clamp-1">
            {currentStore?.label}
          </span>
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search forr store..." />
            <CommandEmpty>No results found.</CommandEmpty>
            {formattedItems.length > 0 && (
              <CommandGroup heading="Stores">
                {formattedItems.map((item) => (
                  <CommandItem
                    className="text-sm"
                    onSelect={() => onStoreSelect(item)}
                    key={item.value}
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    <CheckIcon
                      className={cn(
                        "h-4 w-4",
                        currentStore?.value === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={storeModal.onOpen}>
                <PlusCircleIcon className="mr-2 w-4 h-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
