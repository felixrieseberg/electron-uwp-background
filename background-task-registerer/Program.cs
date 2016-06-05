using System;
using System.Threading;
using Windows.ApplicationModel.Background;

namespace BackgroundTaskRegisterer
{
    class Program
    {
        /// <summary>
        /// Creates thread to register for background tasks
        /// </summary>
        static void Main(string[] args)
        {
            Thread registerBackgroundThread = new Thread(new ThreadStart(ThreadProc));
            registerBackgroundThread.Start();
            Console.ReadLine();
        }

        /// <summary>
        /// Register for background tasks (Time zone trigger & time trigger)
        /// </summary>
        static async void ThreadProc()
        {
  
            await BackgroundExecutionManager.RequestAccessAsync();

            // Register a TimeZoneTrigger background task with name and trigger
            RegisterBackgroundTask("TimeZoneTriggerTest", new SystemTrigger(SystemTriggerType.TimeZoneChange, false));
            Console.WriteLine("Registration completed for Time Zone change system event.");

            // Register a background TimeTrigger task with name and trigger
            RegisterBackgroundTask("TimerTriggerTest", new TimeTrigger(15, false));
            Console.WriteLine("Registration completed for Time trigger event. The backgrond task runs every 15 mins");
        }

        /// <summary>
        /// Register a background task with the taskEntryPoint, name and trigger
        /// </summary>
        public static void RegisterBackgroundTask(String triggerName, IBackgroundTrigger trigger)
        {
            // Check if the task is already registered
            foreach (var cur in BackgroundTaskRegistration.AllTasks)
            {
                if (cur.Value.Name == triggerName)
                {
                    // The task is already registered.
                    return;
                }
            }

            BackgroundTaskBuilder builder = new BackgroundTaskBuilder();
            builder.Name = triggerName;
            builder.SetTrigger(trigger);
            builder.TaskEntryPoint = "BackgroundTask.BackgroundTask";
            builder.Register();
        }
    }
}
