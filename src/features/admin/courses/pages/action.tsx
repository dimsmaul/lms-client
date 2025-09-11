import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useUserAuthAction } from "../hooks/useCourseAuthAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import PreviewImage from "@/components/preview-image";

export interface ActionCourseAuthProps {
  is_update?: boolean;
}

const ActionCourseAuth: React.FC<ActionCourseAuthProps> = (props) => {
  const { form, handleSubmitUser } = useUserAuthAction();
  const navigation = useNavigate();

  return (
    <div className="px-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          {props.is_update ? "Update" : "Create"} User
        </h1>
      </div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(handleSubmitUser)}
          className="grid grid-cols-2 space-y-6 gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="input title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="input last name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="input username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="input email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="input password"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
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
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSuperAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>As Super Admin</FormLabel>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAllowedToCreateCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowed To Create Course</FormLabel>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          /> */}

          <div className="col-span-2 flex gap-2 justify-end mt-5 mb-10">
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => navigation(-1)}
            >
              Discard
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionCourseAuth;
