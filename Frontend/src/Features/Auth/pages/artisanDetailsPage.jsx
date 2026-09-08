import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { artisanDetailsSchema } from "../schemas/authSchemas"
import { fetchCrafts, fetchRegions } from "../services/authService"

// const CRAFTS = [
//   "Kente weaving",
//   "Bead making",
//   "Leather work",
//   "Pottery",
//   "Woodcarving",
//   "Batik / fabric dyeing",
//   "Basket weaving",
//   "Smock weaving",
//   "Jewellery making",
//   "Brass casting",
// ]

// const REGIONS = [
//   "Greater Accra",
//   "Ashanti",
//   "Western",
//   "Western North",
//   "Eastern",
//   "Central",
//   "Northern",
//   "North East",
//   "Savannah",
//   "Volta",
//   "Oti",
//   "Bono",
//   "Bono East",
//   "Ahafo",
//   "Upper East",
//   "Upper West",
// ]

export default function ArtisanDetailsAuthPage({ onComplete, onBack, isSubmitting }) {
  const [customCraft, setCustomCraft] = useState("")
  const [showCustomCraft, setShowCustomCraft] = useState(false);
  const [crafts, setCrafts] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const craftResponse = await fetchCrafts();
        // console.log("Crafts Response: ", craftResponse);
        setCrafts(craftResponse)
      } catch (error) {
        console.log(error)
      } 
      try {
        const regionResponse = await fetchRegions();
        // console.log("Regions Response: ", regionResponse);
        setRegions(regionResponse);
      } catch (error) {
        console.log(error)
      }            
    }
    loadOptions();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(artisanDetailsSchema),
    defaultValues: {
      craft: "",
      region: "",
      location: "",
    },
  })

  const selectedCraft = watch("craft")

  function handleCraftChange(e) {
    const value = e.target.value
    if (value === "__other__") {
      setShowCustomCraft(true)
      setValue("craft", "", { shouldValidate: false })
    } else {
      setShowCustomCraft(false)
      setValue("craft", value, { shouldValidate: true })
    }
  }

  function handleCustomCraftChange(e) {
    const value = e.target.value
    setCustomCraft(value)
    setValue("craft", value, { shouldValidate: true })
  }

  function onSubmit(data) {
    onComplete(data)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:border-gray-400 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your craft</h2>
            <p className="text-gray-500">A few more details about your work</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-8">
          <div className="h-1 flex-1 rounded-full bg-[#1D9E75]" />
          <div className="h-1 flex-1 rounded-full bg-[#1D9E75]" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* Craft */}
          <div>
            <label className="block text-gray-600 mb-1">
              Craft type
            </label>
            <select
              onChange={handleCraftChange}
              defaultValue=""
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 bg-white outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
                // ${errors.craft ? "border-red-400" : "border-gray-300"}`}
            >
              <option value="" disabled>Select your craft</option>
              {crafts.map((craft) => (
                <option key={craft.id} value={craft.id}>{craft.craft_name}</option>
              ))}
            </select>
            {/* Hidden RHF-bound input */}
            {/* <input type="hidden" {...register("craft")} /> */}

            {showCustomCraft && (
              <input
                type="text"
                value={customCraft}
                onChange={handleCustomCraftChange}
                placeholder="Describe your craft"
                className="w-full h-11 px-3 mt-2 rounded-lg border text-gray-900 placeholder-gray-400 outline-none transition
                  focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            )}
            {errors.craft && (
              <p className="text-red-500 mt-1">{errors.craft.message}</p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="block text-gray-600 mb-1">
              Region
            </label>
            <select
              {...register("region")}
              defaultValue=""
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
            >
              <option value="" disabled>Select your region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>{region.region_name}</option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 mt-1">{errors.region.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600 mb-1">
              Location / area
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="e.g. Makola, Kumasi Central"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
            />
            {errors.location && (
              <p className="text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white  font-semibold transition disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Please wait…" : "Complete registration"}
          </button>

        </form>

      </div>
    </div>
  )
}