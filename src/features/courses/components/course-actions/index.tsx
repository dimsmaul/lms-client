import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap } from "lucide-react";
import React from "react";
import PreviewImage from "@/components/preview-image";
import { useCourseAction } from "../../hooks/useCourseAction";

export interface CourseActionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

const CourseAction: React.FC<CourseActionProps> = ({
  isCreate,
  isOpen,
  setIsOpen,
}) => {
  const { form, handleSubmit } = useCourseAction({
    isCreate,
    isOpen,
    setIsOpen,
  });

  return (
    <div className="z-0">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full">
          <DialogHeader>
            <div className="bg-muted p-1 w-fit rounded-sm border">
              <GraduationCap />
            </div>
            <DialogTitle>{isCreate ? "Create " : "Edit "} Course</DialogTitle>
            <DialogDescription>
              {isCreate
                ? "Please fill in the details to create a new course."
                : "Please update the course details."}
            </DialogDescription>
            <p className="text-muted-foreground text-sm text-balance">
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}
            </p>
            {/* {JSON.stringify(user)} */}
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((val) => handleSubmit(val))}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          id="text"
                          type="text"
                          placeholder="Course Title"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passingScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Score</FormLabel>
                      <FormControl>
                        <Input
                          id="number"
                          type="number"
                          placeholder="Passing Score"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              field.onChange(file); // simpan File ke RHF
                            }}
                          />
                        </FormControl>
                        {field.value && (
                          <PreviewImage
                            url={
                              typeof field.value === "string"
                                ? field.value
                                : URL.createObjectURL(field.value)
                            }
                          />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="text"
                          placeholder="Course Description"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 mt-5">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      form.reset();
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseAction;
