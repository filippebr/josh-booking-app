import Image from 'next/image'

interface menuProps {}

export default function Menu() {
  return (
    <>
      <div>
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="text"
            placeholder="name"
            onChange={handleTextChange}
            value={input.name}
          />

          <input
            name="price"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="text"
            placeholder="price"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            value={input.price}
          />

          <DynamicSelect
            value={input.categories}
            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
            className="h-12"
          />

          <label
            htmlFor="file"
            className="relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium"
          >
            <span className="sr-only">File Input</span>
            <div className="flex h-full items-center justify-center">
              {preview ? (
                <div className="relative h-3/4 w-full">
                  <Image
                    alt="preview"
                    style={{ objectFit: 'contain' }}
                    fill
                    src={preview}
                  />
                </div>
              ) : (
                <span>Select image</span>
              )}
            </div>
            <input
              name="file"
              id="file"
              onChange={handleFileSelect}
              accept="image/jpeg image/png image/jpg"
              type="file"
              className="sr-only"
            />
          </label>

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            disabled={!input.file || !input.name}
            onClick={addMenuItem}
          >
            Add menu item
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Your menu items:</p>
          <div className="mb-12 mt-6 grid grid-cols-4 gap-8">
            {menuItems?.map((menuItem) => (
              <div key={menuItem.id}>
                <p>{menuItem.name}</p>
                <div className="relative h-40 w-40">
                  <Image priority fill alt="" src={menuItem.url}></Image>
                </div>
                <button
                  onClick={() => handleDelete(menuItem.imageKey, menuItem.id)}
                  className="text-xs text-red-500"
                  delete
                ></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
