import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddNewCheat({ HandleSavedSub }) {
  return (
    <Dialog>
      <DialogTrigger className="">Add Cheat</DialogTrigger>
      <DialogContent className="bg-folio-slate shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <DialogHeader>
          <DialogTitle>Add New Cheat</DialogTitle>
        </DialogHeader>
        <form
          action={HandleSavedSub}
          className="bg-folio-slate shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <label
            htmlFor="cheat_title"
            className="block text-folio-cyan text-sm font-bold mb-2"
          >
            Enter Title
          </label>
          <input
            id="cheat_title"
            name="cheat_title"
            type="text"
            required
            className="shadow appearance-none border border-folio-cyan text-folio-cyan rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label
            htmlFor="cheat_code"
            className="block text-folio-cyan text-sm font-bold mb-2"
          >
            Enter Code
          </label>
          <input
            id="cheat_code"
            name="cheat_code"
            type="text"
            required
            className="shadow appearance-none border border-folio-cyan text-folio-cyan rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label
            htmlFor="cheat_effect"
            className="block text-folio-cyan text-sm font-bold mb-2"
          >
            Enter Effect
          </label>
          <textarea
            id="cheat_effect"
            name="cheat_effect"
            required
            className="shadow appearance-none border border-folio-cyan text-folio-cyan rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <DialogFooter>
            <button type="submit">Submit?</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
